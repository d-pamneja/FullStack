from setuptools import setup, find_packages

with open("requirements.txt") as f:
    requirements = [req.strip() for req in f.readlines() if req.strip()]
    
setup(
    name="100xBrainly",
    version="2.1.0",
    author="Dhruv Pamneja",
    author_email="dpamneja@gmail.com",
    install_requires=[requirements],
    packages=find_packages()
)