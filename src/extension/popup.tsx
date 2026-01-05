import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { DJStyle, DJVoice } from '../../types';
import '../index.css';

interface Settings {
    enabled: boolean;
    voice: DJVoice;
    style: DJStyle;
    customPrompt?: string;
}

const Popup = () => {
    const [settings, setSettings] = useState<Settings>({
        enabled: true,
        voice: 'Kore',
        style: DJStyle.STANDARD,
        customPrompt: ''
    });
    const [status, setStatus] = useState("Ready");

    useEffect(() => {
        // Load settings
        chrome.storage.local.get(['horisFmSettings'], (result) => {
            if (result.horisFmSettings) {
                setSettings(result.horisFmSettings);
            }
        });

        const listener = (message: any) => {
            if (message.type === 'STATUS_UPDATE') {
                setStatus(message.status);
            }
        };
        chrome.runtime.onMessage.addListener(listener);
        return () => chrome.runtime.onMessage.removeListener(listener);
    }, []);

    const saveSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        chrome.storage.local.set({ horisFmSettings: newSettings });
    };

    const openSettings = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('src/extension/options.html'));
        }
    };

    return (
        <div className="flex flex-col h-full bg-background p-6 select-none justify-between">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-xl font-bold tracking-tight text-white">Hori-s.FM</h1>
                <div className={`w-2.5 h-2.5 rounded-full ${settings.enabled ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-red-500'} transition-all duration-500`}></div>
            </div>

            {/* Main Control */}
            <div className="flex-1 flex flex-col justify-center items-center mb-8">
                <button
                    onClick={() => saveSettings({ ...settings, enabled: !settings.enabled })}
                    className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-lg
                        ${settings.enabled
                            ? 'border-primary/20 bg-primary/10 text-primary shadow-primary/20'
                            : 'border-white/5 bg-white/5 text-secondary hover:border-white/10 hover:bg-white/10'
                        }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" className={settings.enabled ? 'hidden' : 'block'} />
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" className={settings.enabled ? 'block' : 'hidden'} />
                    </svg>
                </button>
                <div className="mt-6 text-center">
                    <div className="text-lg font-medium text-white tracking-wide">
                        {settings.enabled ? 'System Active' : 'System Offline'}
                    </div>
                    <div className="text-xs text-secondary mt-1 font-medium tracking-wide uppercase opacity-60">
                        {status}
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="space-y-3">
                <button
                    onClick={openSettings}
                    className="w-full py-3 px-4 rounded-xl bg-surface hover:bg-white/5 border border-white/5 hover:border-white/10 text-sm font-medium text-secondary hover:text-white transition-all flex items-center justify-between group"
                >
                    <span>Configuration</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

        </div>
    );
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
ReactDOM.createRoot(root).render(<Popup />);
