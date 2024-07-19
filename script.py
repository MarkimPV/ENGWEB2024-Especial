import json

def modify_dataset(input_file, output_file):
    # Ler o arquivo JSON
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Modificar o campo "designacao" para "_id"
    for item in data:
        item["_id"] = item.pop("designacao")
    
    # Salvar o dataset modificado em um novo arquivo JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

# Nome dos arquivos de entrada e saída
input_file = 'input.json'
output_file = 'dataset.json'

# Chamar a função para modificar o dataset
modify_dataset(input_file, output_file)