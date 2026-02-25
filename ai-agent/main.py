from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
import uvicorn
from dotenv import load_dotenv

# Importing our agent logic
from agent import process_dom_with_agent

load_dotenv()

app = FastAPI(title="AutoQA Reasoning Engine")

class DOMPayload(BaseModel):
    url: str
    title: str
    interactiveElements: List[Dict[str, Any]]

@app.get("/health")
def health_check():
    return {"status": "🧠 AutoQA AI Agent is alive!"}

# Our main reasoning route
@app.post("/api/reason")
def reason_test_script(payload: DOMPayload):
    # Convert Pydantic model to a standard dictionary to pass to the agent
    payload_dict = payload.model_dump()
    
    # Call the isolated agent logic
    result = process_dom_with_agent(payload_dict)
    
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)