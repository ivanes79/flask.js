from registro_ig import app
from flask import jsonify,render_template,request
from registro_ig.models import *
from config import VERSION
import sqlite3
from http import HTTPStatus

@app.route("/")
def index():
    return render_template("index.html")

@app.route(f"/api/{VERSION}/all")
def all_movements():    
    
    try:
        registros = select_all()
        #return jsonify(registros)
        return jsonify(
            {
                "data": registros,
                "status": "OK"
            }
        ),HTTPStatus.OK #agrego codigo de respuesta http
    except sqlite3.Error as e:
         return jsonify(
            {
                "data": str(e),
                "status": "Error"
            }
        ),HTTPStatus.BAD_REQUEST#agrego codigo de respuesta http   

@app.route(f"/api/{VERSION}/new",methods=["POST"])
def new():
    registro = request.json
    try:
        insert([ registro['date'],registro['concept'],registro['quantity'] ])
        return jsonify(
            {
                "status": "OK"
            }
        ),HTTPStatus.CREATED #agrego codigo de respuesta http
    except sqlite3.Error as e:
         return jsonify(
            {
                "data": str(e),
                "status": "Error"
            }
        ),HTTPStatus.BAD_REQUEST#agrego codigo de respuesta http    
    

@app.route(f"/api/{VERSION}/update/<int:id>",methods=["PUT"])
def update(id):
    registro = request.json
    try:
        update_by(id, [ registro['date'],registro['concept'],registro['quantity'] ])
        return jsonify(
            {
                "status": "OK"
            }
        ),HTTPStatus.CREATED #agrego codigo de respuesta http
    except sqlite3.Error as e:
         return jsonify(
            {
                "data": str(e),
                "status": "Error"
            }
        ),HTTPStatus.BAD_REQUEST#agrego codigo de respuesta http    
    

@app.route(f"/api/{VERSION}/delete/<int:id>",methods=["DELETE"])
def remove(id):
    try:
        delete_by(id)
        return jsonify(
            {
                "status": "OK"
            }
        ),HTTPStatus.OK #agrego codigo de respuesta http
    except sqlite3.Error as e:
         return jsonify(
            {
                "data": str(e),
                "status": "Error"
            }
        ),HTTPStatus.BAD_REQUEST#agrego codigo de respuesta http    