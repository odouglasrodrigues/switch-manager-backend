#!/usr/bin/python3
# -*- coding: utf-8 -*-

import time
import telnetlib
import json
import sys
import re
import socketio

sio = socketio.Client()

ip = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
port = sys.argv[4]
interface = sys.argv[5]
id = sys.argv[6]
tempo = int(sys.argv[7])


def GetSinalOfTransceiver(dados):
    for linha in dados:
        if re.search(r'RX.+Power\(', linha):
            RxSinal = float(linha.split(':')[1])

        if re.search(r'RX.+Power.+High.+T', linha):
            RxSinalHigh = float(linha.split(':')[1])

        if re.search(r'RX.+Power.+Low.+T', linha):
            RxSinalLow = float(linha.split(':')[1])

        if re.search(r'TX.+Power\(', linha):
            TxSinal = float(linha.split(':')[1])

        if re.search(r'TX.+Power.+High.+T', linha):
            TxSinalHigh = float(linha.split(':')[1])

        if re.search(r'TX.+Power.+Low.+T', linha):
            TxSinalLow = float(linha.split(':')[1])

            sio.emit('RunningMonitoring', {'rx': {'sinal': RxSinal, 'low': RxSinalLow, 'high': RxSinalHigh}, 'tx': {
                     'sinal': TxSinal, 'low': TxSinalLow, 'high': TxSinalHigh}, 'id': id})
            break
    return


def GetSinalOf40GETransceiver(dados):
    for linha in dados:
        if re.search(r'RX.+Power\(', linha):
            RxSinal1 = float(linha.split(':')[1].split('|')[0])
            RxSinal2 = float(linha.split(':')[1].split('|')[1].split('(')[0])
            RxSinal = round((RxSinal1+RxSinal2)/2, 2)

        if re.search(r'RX.+Power.+High.+T', linha):
            RxSinalHigh = float(linha.split(':')[1])

        if re.search(r'RX.+Power.+Low.+T', linha):
            RxSinalLow = float(linha.split(':')[1])

        if re.search(r'TX.+Power\(', linha):
            TxSinal1 = float(linha.split(':')[1].split('|')[0])
            TxSinal2 = float(linha.split(':')[1].split('|')[1].split('(')[0])
            TxSinal = round((TxSinal1+TxSinal2)/2, 2)

        if re.search(r'TX.+Power.+High.+T', linha):
            TxSinalHigh = float(linha.split(':')[1])

        if re.search(r'TX.+Power.+Low.+T', linha):
            TxSinalLow = float(linha.split(':')[1])

            sio.emit('RunningMonitoring', {'rx': {'sinal': RxSinal, 'low': RxSinalLow, 'high': RxSinalHigh}, 'tx': {
                     'sinal': TxSinal, 'low': TxSinalLow, 'high': TxSinalHigh}, 'id': id})
            break
    return


def main(ip, user, password, port):
    statusMessage = {'status': 'sucesso',
                     'message': 'Conexão realizada com sucesso!', 'dados': {}}

    try:

        sio.connect('http://localhost:5000')

        tn = telnetlib.Telnet(ip, port, 10)
    except Exception as e:
        statusMessage['status'], statusMessage['message'] = 'erro', 'Não foi possivel se conectar ao equipamento, verifique o IP e porta'

        print(json.dumps(statusMessage))
        sio.disconnect()
        return

    # tn.set_debuglevel(100)

    tn.read_until(b"Username:")
    tn.write(user.encode('utf-8') + b"\n")
    time.sleep(.3)
    tn.read_until(b"Password:")
    tn.write(password.encode('utf-8') + b"\n")
    time.sleep(.3)

    tn.write(b"screen-length 0 temporary\n")
    time.sleep(.3)
    tn.write(b"sys\n")
    time.sleep(.3)

    start = time.time()
    executando = True
    while executando:
        tn.write(
            f"display transceiver interface {interface} verbose\n".encode('utf-8'))
        time.sleep(.3)
        transceiverInfo = tn.read_until(
            'Control flag'.encode('iso8859-1'), 3).decode('iso8859-1').splitlines()

        if re.search(r'40GE', interface):
            GetSinalOf40GETransceiver(transceiverInfo)
        else:
            GetSinalOfTransceiver(transceiverInfo)

        if time.time() > start+tempo+3:
            executando = False
            sio.disconnect()

    # Fechando conexao com a OLT
    tn.write(b"quit\n")
    time.sleep(.3)
    tn.write(b"quit\n")
    time.sleep(.3)
    tn.close()
    return


if __name__ == "__main__":
    main(ip, user, password, port)
