"use client";

import { RequestorInformation } from "@/types/Resume";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type ResumeContextState = RequestorInformation | null;

type ResumeContext = {
  resume: ResumeContextState;
  setResume: Dispatch<SetStateAction<ResumeContextState>>;
} | null;

const ResumeContext = createContext<ResumeContext>(null);

type ResumeContextProviderProps = {
  children: ReactNode;
};

export function ResumeContextProvider({
  children,
}: ResumeContextProviderProps) {
  const [resume, setResume] = useState<ResumeContextState>(null);

  return (
    <ResumeContext.Provider value={{ resume, setResume }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("Unable to get resume context");
  }

  return context;
}
