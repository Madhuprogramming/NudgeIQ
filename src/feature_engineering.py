"""
NudgeIQ Feature Engineering Module
----------------------------------
This module creates all behavioural constructs used
throughout the NudgeIQ pipeline.
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler


def create_behavioral_features(df):
    """
    Generate behavioural features from the processed dataset.
    """

    behavior = df.copy()

    # -------------------------------------------------
    # Encode categorical variables
    # -------------------------------------------------

    behavior["housing_num"] = behavior["housing"].map({"yes": 1, "no": 0})

    behavior["loan_num"] = behavior["loan"].map({"yes": 1, "no": 0})

    behavior["default_num"] = behavior["default"].map({"yes": 1, "no": 0})

    behavior["contact_num"] = behavior["contact"].astype("category").cat.codes

    behavior["education_num"] = behavior["education"].astype("category").cat.codes

    # -------------------------------------------------
    # Standardize numerical variables
    # -------------------------------------------------

    scaler = StandardScaler()

    numerical_columns = ["age", "balance", "campaign", "previous", "duration"]

    behavior[[f"{col}_z" for col in numerical_columns]] = scaler.fit_transform(
        behavior[numerical_columns]
    )

    # =====================================================
    # Financial Stability
    # =====================================================

    behavior["Financial_Stability"] = (
        0.40 * behavior["balance_z"]
        - 0.25 * behavior["loan_num"]
        - 0.20 * behavior["housing_num"]
        - 0.15 * behavior["default_num"]
    )

    # =====================================================
    # Contact Intensity
    # =====================================================

    behavior["Contact_Intensity"] = (
        behavior["campaign_z"] + behavior["contact_num"]
    ) / 2

    # =====================================================
    # Relationship History
    # =====================================================

    behavior["Relationship_History"] = behavior["previous_z"]

    # =====================================================
    # Investment Experience
    # =====================================================

    behavior["Investment_Experience"] = (
        behavior["age_z"] + behavior["education_num"]
    ) / 2

    # =====================================================
    # Responsiveness
    # =====================================================

    behavior["Responsiveness"] = behavior["duration_z"]

    # =====================================================
    # Investment Readiness
    # =====================================================

    behavior["Investment_Readiness"] = (
        0.60 * behavior["Investment_Experience"] + 0.40 * behavior["Contact_Intensity"]
    )

    # =====================================================
    # Standardize all behavioural constructs
    # =====================================================

    construct_cols = [
        "Financial_Stability",
        "Contact_Intensity",
        "Relationship_History",
        "Investment_Experience",
        "Responsiveness",
        "Investment_Readiness",
    ]

    behavior[construct_cols] = StandardScaler().fit_transform(behavior[construct_cols])

    return behavior
