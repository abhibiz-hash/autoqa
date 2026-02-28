from typing import TypedDict, List, Dict, Any
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

load_dotenv()
# 1. Define the LangGraph State
# This is the "memory" that gets passed from one AI node to the next
class GraphState(TypedDict):
    url: str
    title: str
    elements: List[Dict[str, Any]]
    page_type: str          # The AI will decide this (ex- "Login Page", "Checkout")
    test_plan: str          # The AI's step by step reasoning
    playwright_code: str    # The final synthesized script


llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Define first LangGraph Node
def analyze_page_type(state: GraphState) -> GraphState:
    print(f"🧠 Node 1: Analyzing page type for {state['url']}...")

    #Defining AI persona and rules
    system_prompt = """You are an expert QA Automation Engineer.
    Analyze the provided structured DOM elements and determine the primary user flow of this page.
    Respond ONLY with a short, standardized classification (e.g., 'Login Page', 'Checkout Form', 'Search Page')."""

    human_prompt = f"URL: {state['url']}\nElements: {json.dumps(state['elements'], indent=2)}"

    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=human_prompt)
    ])

    # Update the State with the AI's conclusion
    state["page_type"] = response.content.strip()
    print(f"✅ AI classified page as: {state['page_type']}")

    return state

def plan_test(state: GraphState) -> GraphState:
    print(f"📝 Node 2: Writing test plan for {state['page_type']}...")

    system_prompt = """You are an expert QA Automation Lead.
    Based on the provided page type and DOM elements, write a clear, step-by-step test plan for the 'happy path' (e.g., successful login, successful search).
    Keep it concise. Respond ONLY with the numbered steps."""

    human_prompt = f"Page Type: {state['page_type']}\nElements: {json.dumps(state['elements'], indent=2)}"

    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=human_prompt)
    ])

    state["test_plan"] = response.content.strip()
    return state

def generate_code(state: GraphState) -> GraphState:
    print(f"💻 Node 3: Synthesizing Playwright code...")

    system_prompt = """You are a Senior Software Developer in Test (SDET).
    Write a complete, executable Playwright TypeScript test script using the provided test plan and DOM elements.
    Rules:
    - Use modern Playwright semantic locators (e.g., getByRole, getByPlaceholder, getByLabel).
    - Do NOT wrap the output in markdown code blocks (```typescript).
    - Respond ONLY with the raw, executable TypeScript code."""

    human_prompt = f"""
    URL: {state['url']}
    Test Plan: {state['test_plan']}
    Elements: {json.dumps(state['elements'], indent=2)}
    """

    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=human_prompt)
    ])

    #Clean up any accidental markdown blocks the LLM might have ignored rules about
    code = response.content.replace("```typescript", "").replace("```ts", "").replace("```", "").strip()
    state["playwright_code"] = code
    return state


# The entry point for our FastAPI route to call
def process_dom_with_agent(payload: dict):
    print(f"🤖 Agent initialized for URL: {payload.get('url')}")
    
    # Initialize the State with the data from Node.js
    initial_state: GraphState = {
        "url": payload.get("url", ""),
        "title": payload.get("title", ""),
        "elements": payload.get("interactiveElements", []),
        "page_type": "",
        "test_plan": "",
        "playwright_code": ""
    }
    
    # Build the LangGraph workflow
    workflow = StateGraph(GraphState)

    workflow.add_node("analyze", analyze_page_type)
    workflow.add_node("plan", plan_test)
    workflow.add_node("code", generate_code)

    workflow.set_entry_point("analyze")
    workflow.add_edge("analyze", "plan")
    workflow.add_edge("plan", "code")
    workflow.add_edge("code", END)

    app = workflow.compile()
    final_state = app.invoke(initial_state)
    
    return {
        "success": True,
        "message": "Test script generated successfully!",
        "page_type": final_state["page_type"],
        "test_plan": final_state["test_plan"],
        "code": final_state["playwright_code"]
    }