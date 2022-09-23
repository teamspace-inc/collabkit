import React from 'react';
import { config } from './constants';

// This context is used within stories to access the props + theme that can be
// passed to CollabKitProvider, to make it easy to render a CollabKitProvider
// with custom props within a story.
export const ProviderPropsContext = React.createContext(config);

export type DefaultProviderProps = typeof config;
