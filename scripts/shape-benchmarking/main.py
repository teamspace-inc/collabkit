import pandas as pd
import subprocess
import os
from getpass import getpass
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.callbacks import get_openai_callback
from langchain.agents import AgentExecutor
from SQLAgent import SQLDBAgent
from SQLsequentialDBChain import SQLseqDBChain,SQLseqDBChainWithRows
from SQLDatabaseChain import SQLDBChain,SQLDBChainWithRows


SPIDER_DATABASE_DIR = "spider"
os.environ["OPENAI_API_KEY"] = getpass()
key = os.getenv("OPENAI_API_KEY")
def count_tokens(agent, query):
    with get_openai_callback() as cb:
        result = agent(query)
        print(f'Spent a total of {cb.total_tokens} tokens')
    return result
def load_database(SPIDER_DATABASE_DIR):
    # dev_df = pd.read_json(SPIDER_DATABASE_DIR+"/dev.json")
    # dev_df = dev_df.drop(columns = ['query_toks', 'query_toks_no_value', 'question_toks','sql'], axis=1)
    dev_df = pd.read_csv(SPIDER_DATABASE_DIR+"/Spider_revised.csv")
    schema_df = pd.read_json(SPIDER_DATABASE_DIR+"/tables.json")
    return dev_df,schema_df
def run(dev_df):
    results = []
    for index, row in dev_df.iterrows():
        if index > 99 or index < 33: continue
        print(f"Current index is {index}")
        print(row['question'])
        print(row['query'])
        SQLAgent = SQLseqDBChainWithRows(row['db_id'],key)
        db_chain = SQLAgent.get_chain()
        #print(agent_executor.agent.get_allowed_tools())
        response = count_tokens(db_chain,row['question'])
        predicted_SQL = SQLAgent.get_SQL_query(response)
        file1 = open("predicted_SQLS.txt", "a")  # append mode
        file1.write(predicted_SQL+" \n")
        file1.close()
        file1 = open("GOLD_SQLS.txt", "a")  # append mode
        file1.write(row['query'] + "\t" + row['db_id'] +" \n")
        file1.close()
        print(predicted_SQL)
        print("=================================")
        results.append([row['question'], predicted_SQL, row['query'], row['db_id']])
    return results
def evaluation(results_dir):
    command = "cp " + results_dir + " test-suite-sql-eval-master/results"
    subprocess.run(command, shell=True, capture_output=False, text=True)
    command = "python3 test-suite-sql-eval-master/OutputProcessing.py"
    subprocess.run(command, shell=True, capture_output=False, text=True)
    command = "rm test-suite-sql-eval-master/results/test.csv"
    subprocess.run(command, shell=True, capture_output=False, text=True)
    cmd_str = "python3 test-suite-sql-eval-master/evaluation.py --gold test-suite-sql-eval-master/processed_results/Gold_test.txt --pred test-suite-sql-eval-master/processed_results/Predicted_test.txt --db test-suite-sql-eval-master/database/ --etype exec "
    result = subprocess.run(cmd_str, shell=True, capture_output=True, text=True)
    command = "rm test-suite-sql-eval-master/processed_results/Gold_test.txt"
    subprocess.run(command, shell=True, capture_output=False, text=True)
    command = "rm test-suite-sql-eval-master/processed_results/Predicted_test.txt"
    subprocess.run(command, shell=True, capture_output=False, text=True)
    return float(result.stdout[-21:-16])

if __name__ == '__main__':
    dev_df,schema_df = load_database(SPIDER_DATABASE_DIR)
    results = run(dev_df)
    df = pd.DataFrame(results, columns=['NLQ', 'PREDICTED SQL', 'GOLD SQL', 'DATABASE'])
    #df.to_csv("test.csv", index=False)
    #results = evaluation("test.csv")
    #print(f"The execution accuracy is {results}")