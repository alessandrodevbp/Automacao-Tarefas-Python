import pyautogui
import time
import pandas as pd

link = "file:///C:/Users/Alessandro/Desktop/An%C3%A1lise%20e%20desenvolvimento%20de%20sistemas/Projetos/Javascript/Cadastro%20de%20Produtos/index.html"
tabela = pd.read_csv("Produtos.csv")
pyautogui.PAUSE = 1.5

pyautogui.press("win")
pyautogui.write("edge")
pyautogui.press("enter")
time.sleep(20)
pyautogui.write(link)   
pyautogui.press("enter")

for linha in tabela.index: 

    pyautogui.click(x=676, y=376)
    time.sleep(2)
    codigo = str(tabela.loc[linha, "codigo"])
    pyautogui.write(codigo)
    pyautogui.press("tab")  
    marca = str(tabela.loc[linha, "marca"])
    pyautogui.write(marca)
    pyautogui.press("tab")
    tipo = str(tabela.loc[linha, "tipo"])
    pyautogui.write(tipo) 
    pyautogui.press("tab")
    categoria = str(tabela.loc[linha, "categoria"]) 
    pyautogui.write(categoria)
    pyautogui.press("tab")
    preco_unitario = str(tabela.loc[linha, "preco_unitario"])
    pyautogui.write(preco_unitario)
    pyautogui.press("tab")
    custo = str(tabela.loc[linha, "custo"])
    pyautogui.write(custo)
    pyautogui.press("tab")
    obs = str(tabela.loc[linha, "obs"])
    if obs != "nan":
        pyautogui.write(obs)
    pyautogui.press("enter")
    pyautogui.scroll(3000)




