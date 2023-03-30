import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DropDown, { VibeType } from '../components/DropDown';
import Footer from '../components/Footer';
import Github from '../components/GitHub';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import ResizablePanel from '../components/ResizablePanel';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [generatedBios, setGeneratedBios] = useState<String>('');

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      
      
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        
        
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Generate your next Twitter bio using chatGPT
        </h1>


      </main>
    </div>
  );
};

export default Home;
