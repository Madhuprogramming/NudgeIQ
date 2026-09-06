import pandas as pd


def load_dataset(filepath, separator=";"):
    """
    Load a CSV dataset.
    """
    return pd.read_csv(filepath, sep=separator)


def save_dataframe(df, filepath):
    """
    Save DataFrame to CSV.
    """
    df.to_csv(filepath, index=False)


def print_section(title):
    """
    Print a formatted section title.
    """
    print("\n" + "=" * 70)
    print(title)
    print("=" * 70)
