import pandas as pd
import utm

def get_positions():
    datos = pd.read_excel("data/positions.xlsx")
    longitud = []
    latitud = []
    for _, renglon in datos.iterrows():
        lat, lon = utm.to_latlon(renglon.x, renglon.y, 11, "R")
        longitud.append(lon)
        latitud.append(lat)
    datos["longitude"] = longitud
    datos["latitude"] = latitud
    return datos.to_json(orient="records")
