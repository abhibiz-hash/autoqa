# AutoQA.ai 🤖

AutoQA.ai is an autonomous, AI-driven QA testing agent. It parses web page structures, reasons over the semantic DOM, and dynamically generates and executes Playwright E2E test scripts.

## 🏗️ Architecture

This is a monorepo containing three distinct microservices:

- **/frontend**: React + TypeScript + TailwindCSS (Minimal UI & Live Socket.IO Telemetry)
- **/backend**: Node.js + Express + Playwright (Orchestration & Execution Engine)
- **/ai-agent**: Python + FastAPI + LangGraph (AI Reasoning & Code Synthesis)

## 🚀 Status: In Development
*Currently building the core infrastructure.*