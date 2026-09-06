print("config.py loaded")
from pathlib import Path
import yaml

# Project Root
PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Data Directories
DATA_DIR = PROJECT_ROOT / "data"

RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
SYNTHETIC_DIR = DATA_DIR / "synthetic"

# Reports
REPORT_DIR = PROJECT_ROOT / "reports"
FIGURE_DIR = REPORT_DIR / "figures"
TABLE_DIR = REPORT_DIR / "tables"
FINDINGS_DIR = REPORT_DIR / "findings"

# Models
MODEL_DIR = PROJECT_ROOT / "models"

# Configuration
CONFIG_FILE = PROJECT_ROOT / "config" / "settings.yaml"

with open(CONFIG_FILE, "r") as file:
    SETTINGS = yaml.safe_load(file)
