import { useContext } from 'react';
import { SettingsContext } from './settingsContextObject';

export const useSettings = () => useContext(SettingsContext);
