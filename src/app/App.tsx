"use client";

import { ApolloProvider } from "@apollo/client";
import api from "@/modules/api";
import MeProvider from "@/providers/MeProvider";
import { Me } from "@/graphql.types";
import { ToastContainer } from "react-toastify";

export default function App({
  children,
  me,
}: {
  children: React.ReactNode;
  me: Me | undefined;
}) {
  return (
    <ApolloProvider client={api}>
      <MeProvider me={me}>
        {children} <ToastContainer theme="dark" position="bottom-right" />
        <footer className="flex flex-row justify-between text-neautraltext text-sm w-full my-8">
          <div>
            Copyright &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://holaplex.com"
              target="_blank"
              className="hover:underline"
            >
              Holaplex Inc
            </a>
          </div>
          <ul className="flex gap-2">
            <li>
              <a
                target="_blank"
                href="https://docs.google.com/document/d/1HgjsyC6P4IlAwh8__NCm4tNoz0xddBtr5VTfa80pugM/edit?usp=sharing"
                className="hover:underline"
              >
                Official rules
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://hub.holaplex.com/terms-of-service"
                className="hover:underline"
              >
                Terms of use
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://hub.holaplex.com/privacy-policy"
                className="hover:underline"
              >
                Privacy policy
              </a>
            </li>
          </ul>
        </footer>
      </MeProvider>
    </ApolloProvider>
  );
}
