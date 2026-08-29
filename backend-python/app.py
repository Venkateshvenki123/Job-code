from fastapi import FastAPI

app = FastAPI(title="New Website Python API")

learning_paths = [
    {"name": "React JS", "level": "beginner to advanced"},
    {"name": "Python", "level": "automation and APIs"},
]

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "python-api"}

@app.get("/api/learning-paths")
def get_learning_paths():
    return {"paths": learning_paths}
