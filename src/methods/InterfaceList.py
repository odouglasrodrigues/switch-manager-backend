#!/usr/bin/python3
# -*- coding: utf-8 -*-

import time
import telnetlib
import json
import sys
import re


def main(ip, user, password, port):
    interfaces = []
    statusMessage = {'status': 'sucesso',
                     'message': 'Conexão realizada com sucesso!', 'dados': {'interfaces': interfaces}}

    try:
        tn = telnetlib.Telnet(ip, port, 10)
    except Exception as e:
        statusMessage['status'], statusMessage['message'] = 'erro', 'Não foi possivel se conectar ao equipamento, verifique o IP e porta'

        print(json.dumps(statusMessage))
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
    tn.write(b"display interface slot 0\n")
    time.sleep(5)
    return_interfaceList = tn.read_until(
        'Control flag'.encode('utf-8'), 3).decode('utf-8').splitlines()
    for linha in return_interfaceList:
        if re.search(r'[0-9]/[0-9]/[0-9]+ [cC]urr', linha):
            interfaceName = linha.split('current')[0].lstrip().rstrip()
            interfaceStatus = linha.split(':')[1].lstrip().rstrip()

        if re.search(r'[dD]escription', linha):
            interfaceDescrtiption = linha.split(':')[1].lstrip().rstrip()
            interfaces.append(
                {interfaceName: {'status': interfaceStatus, 'description': interfaceDescrtiption}})
    print(json.dumps(statusMessage))
    # Fechando conexao com a OLT
    tn.write(b"quit\n")
    time.sleep(.3)
    tn.write(b"quit\n")
    time.sleep(.3)
    tn.close()
    return


ip = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
port = sys.argv[4]

if __name__ == "__main__":
    main(ip, user, password, port)
