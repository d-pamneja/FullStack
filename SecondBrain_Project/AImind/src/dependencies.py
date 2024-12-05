from langchain.document_loaders import PyPDFDirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter 
from openai import OpenAI
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from pinecone import Pinecone, ServerlessSpec
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate 

from .exception import CustomException
from .logger import logging
from dotenv import load_dotenv
load_dotenv()

import os
import sys
import time

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_API_ENV = os.getenv("PINECONE_API_ENV")

# OpenAI Instances
openAI_client = OpenAI(api_key=OPENAI_API_KEY)
embedding_model = openAI_client.embeddings

# Pinecone Instances
pc = Pinecone(api_key = PINECONE_API_KEY, environment = PINECONE_API_ENV)

