import pandas as pd

# Load the dataset
df = pd.read_csv('fashion_products.csv')

filtered_df = df[['Product ID', 'Product Name', 'Price', 'Brand', 'Category', 'Size', 'Rating']]
filtered_df = filtered_df.rename(columns={
    'Product ID': 'id',
    'Product Name': 'name',
    'Price': 'price',
    'Brand': 'brand',
    'Category': 'category',
    'Size': 'size',
    'Rating': 'rating'
})

filtered_df['stock'] = 50

# load dummy images for reference 
default_image_path = 'dummy.jpg'
filtered_df['image'] = default_image_path

filtered_df.to_csv('filtered_fashion_products.csv', index=False)

print(filtered_df)
