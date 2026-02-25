from fastapi import FastAPI
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AutoQA Reasoning Engine")


@app.get("/health")
def health_check():
    return {"status": "🧠 AutoQA AI Agent is alive!"}


if __name__=="__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)