# Importing the dependencies
from src.dependencies import *
from src.query_doc.utils import *
from src.query_doc.prompts import *
from .data_model import *


# Initialising the API from FastAPI and APIRouter
app = FastAPI(prefix="/aimind")
movie_router = APIRouter()

@app.get("/")
def home():
    return "Hello from 100xBrainly AI Mind!"

# VectorDB Storage Endpoint
@app.post("/aimind/storeDoc", response_model=UpsertResponse)
async def storeDoc(query: StoreDoc = Body(...)):
    """AI Mind endpoint to store a Text/PDF document as pinecone records."""
    try:
        if(validators.url(query.initial_query.file_url)):
            # Initial document creation and validation
            all_documents = load_data(query.initial_query.file_url,query.initial_query.file_type)
            try:
                DocumentList.model_validate(all_documents)
                logging.info("Initial document chunk set.")
            except ValidationError as e:
                raise HTTPException(status_code=400, detail=str(e))
            
            # Chunked documents creation and validation
            all_chunked_documents = chunk_data(all_documents)
            try:
                DocumentList.model_validate(all_chunked_documents)
                logging.info("Chunked documents set.")
            except ValidationError as e:
                raise HTTPException(status_code=400, detail=str(e))
            
            
            
        else :
            raise HTTPException(status_code=400, detail="Invalid link type")
        
    except CustomException as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


