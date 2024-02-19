from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL configuration
mysql_config = {
    'host': 'localhost',
    'user': 'backend_datafetcher',
    'password': 'B@ck3ndd@7@f37ch3r',
    'database': 'employees'
}

# Function to connect to MySQL and execute queries with pagination
def execute_query_with_pagination(query, params=None, page=1, per_page=50):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**mysql_config)
        cursor = conn.cursor(dictionary=True)
        
        # Apply pagination
        offset = (page - 1) * per_page
        query_with_pagination = f"{query} LIMIT %s, %s"
        params_with_pagination = params + (offset, per_page) if params else (offset, per_page)
        print(query_with_pagination, params_with_pagination)
        cursor.execute(query_with_pagination, params_with_pagination)

        result = cursor.fetchall()
        conn.commit()  # Commit the transaction
        
        print("Query executed successfully")
        return result
    except Exception as e:
        print("Error executing query:", e)
        return None
    finally:
        if cursor is not None:
            cursor.close()
        if conn is not None:
            conn.close()


# Route to get paginated data without any filtering
@app.route('/api/data', methods=['GET'])
def get_paginated_data():
    page = request.args.get('page', 1, type=int)
    data = execute_query_with_pagination("SELECT * FROM employee_details", page=page)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to retrieve data'}), 500

# Route to get paginated filtered data based on city attribute
@app.route('/api/data/<city>', methods=['GET'])
def get_paginated_filtered_data(city):
    page = request.args.get('page', 1, type=int)
    search_query = "SELECT * FROM employee_details WHERE LOWER(city) LIKE LOWER(%s)"
    params = (f'%{city}%',)  # Define the parameter tuple correctly
    data = execute_query_with_pagination(query=search_query, params=params, page=page, per_page=50)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'No data found for the given city'}), 404



if __name__ == '__main__':
    app.run(debug=True)
