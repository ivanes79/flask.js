from config import *
from registro_ig.conexion import Conexion



def select_ingreso():
    connectSelectIngreso=Conexion("SELECT sum(quantity) FROM movements WHERE quantity>0")
    resultado = connectSelectIngreso.res.fetchall()
    connectSelectIngreso.con.close()
    return resultado[0][0]


def select_egreso():  
    connectSelectEgreso=Conexion("SELECT sum(quantity) FROM movements WHERE quantity<0")
    resultado = connectSelectEgreso.res.fetchall()
    connectSelectEgreso.con.close()
    return resultado[0][0]


def select_all():
    connect = Conexion("select id,date,concept,quantity from movements order by date;")
    filas = connect.res.fetchall()#capturo las filas de datos
    columnas= connect.res.description#capturo los nombres de columnas

    #objetivo crear una lista de diccionario con filas y columnas

    resultado =[]#lista para guadar diccionario
   
    for fila in filas:
        dato={}#diccionario para cada registro
        posicion=0#posicion de columna

        for campo in columnas:
            dato[campo[0]]=fila[posicion]
            posicion += 1
        resultado.append(dato)

    connect.con.close()

    return resultado


def insert(registro):
    connectInsert = Conexion("insert into movements(date,concept,quantity) values(?,?,?)",registro)
    connectInsert.con.commit()#funcion que registra finalmente
    connectInsert.con.close()
   

def select_by(id):
    connectSelectBy=Conexion(f"select id,date,concept,quantity from movements where id={id}")
    resultado = connectSelectBy.res.fetchall()
    connectSelectBy.con.close()
    return resultado[0]

def delete_by(id):
    connectDeleteBy=Conexion(f"delete from movements where id={id}")
    connectDeleteBy.con.commit()
    connectDeleteBy.con.close()

def update_by(id,registro):#['date','concept','quantity']
    connectUpdate=Conexion(f"UPDATE movements SET date=?,concept=?,quantity=? WHERE id={id}",registro)
    connectUpdate.con.commit()
    connectUpdate.con.close()
    connectDeleteby = Conexion(f"DELETE FROM movements WHERE id = {id}")

    connectDeleteby.con.commit()
    connectDeleteby.con.close()