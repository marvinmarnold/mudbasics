import React from "react";
import { LayerContext, EngineContext } from "./context";
import { EngineStore } from "./store";
import { BootScreen, MainWindow, DesktopWindow, ComponentRenderer } from "./components";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useState } from "react";
import { Layers } from "../../../types";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserView, MobileView } from 'react-device-detect';
import { Web3Modal } from '@web3modal/react'

const config = {
  projectId: "1dbb5ef68df75ff636a45402f1a56657",
  theme: "light",   
  accentColor: "default",
  ethereum: {
    appName: 'web3Modal',
    autoConnect: true
  }
};

export const Engine: React.FC<{
  setLayers: { current: (layers: Layers) => void };
  mountReact: { current: (mount: boolean) => void };
  customBootScreen?: React.ReactElement;
}> = observer(({ mountReact, setLayers, customBootScreen }) => {
  const [mounted, setMounted] = useState(true);
  const [layers, _setLayers] = useState<Layers | undefined>();

  useEffect(() => {
    mountReact.current = (mounted: boolean) => setMounted(mounted);
    setLayers.current = (layers: Layers) => _setLayers(layers);
  }, []);

  if (!mounted || !layers) return customBootScreen || <BootScreen />;

  return (
    <>
          <Web3Modal config={config} />

          <LayerContext.Provider value={layers}>
            <EngineContext.Provider value={EngineStore}>

            {/* <ComponentRenderer /> */}

            <BrowserView>
              <DesktopWindow layers={layers} />
            </BrowserView>
            
            <MobileView>
              <ChakraProvider>
                <MainWindow layers={layers} />
              </ChakraProvider>
            </MobileView>

            </EngineContext.Provider>
          </LayerContext.Provider>
    </>
  );
});