import pandas as pd

# Load the dataset
df = pd.read_csv('fashion_products.csv')

# Select the required columns and rename them
filtered_df = df[['Product ID', 'Product Name', 'Price']]
filtered_df = filtered_df.rename(columns={'Product ID': 'id', 'Product Name': 'name', 'Price': 'price'})

# Add a stock column with default values (for example, 50)
filtered_df['stock'] = 50

# Save the filtered data to a new CSV file
filtered_df.to_csv('filtered_fashion_products.csv', index=False)
