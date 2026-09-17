import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Role } from '../../config/navigation';

type PortalContextValue={role:Role;query:string;notify:(message:string)=>void;openCreate:(module:string)=>void};
const PortalContext=createContext<PortalContextValue|null>(null);
export function PortalProvider({value,children}:{value:PortalContextValue;children:ReactNode}){return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>}
export function usePortal(){const value=useContext(PortalContext);if(!value)throw new Error('usePortal must be used inside PortalShell');return value;}
