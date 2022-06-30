#!/usr/bin/python3
# -*- coding: utf-8 -*-

import time
import telnetlib
import json
import sys
import re


def GetShutdownStatus(tn, interface):
    tn.write(f"interface {interface}\n".encode('utf-8'))
    time.sleep(.3)
    tn.write(f"display this\nquit\n".encode('utf-8'))
    time.sleep(.3)
    interface_data = tn.read_until(
        'Control flag'.encode('iso8859-1'), 3).decode('iso8859-1').splitlines()

    for linha in interface_data:
        if re.search(r'shutdown', linha):
            return 'off'
    return 'on'


def main(ip, user, password, port):
    statusMessage = {'status': 'sucesso',
                     'message': 'Conexão realizada com sucesso!', 'dados': {}}

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
    tn.write(b"sys\n")
    time.sleep(.3)

    statusMessage['dados']['interfaceStatus'] = GetShutdownStatus(
        tn, interface)

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
interface = sys.argv[5]

if __name__ == "__main__":
    main(ip, user, password, port)
