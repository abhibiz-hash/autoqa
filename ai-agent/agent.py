from typing import TypedDict, List, Dict, Any
import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

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

# The entry point for our FastAPI route to call
def process_dom_with_agent(payload: dict):
    print(f"🤖 Agent initialized for URL: {payload.get('url')}")
    
    
    return {
        "success": True,
        "message": "Agent service successfully hit!"
    }