import random

# Lista de cartas
cards = [
    "🍏 Maçã", "🍏 Maçã",
    "🐶 Cão", "🐶 Cão",
    "🐱 Gato", "🐱 Gato",
    "🌼 Flor", "🌼 Flor",
    "🚗 Carro", "🚗 Carro",
    "🍕 Pizza", "🍕 Pizza",
    "⚽ Bola", "⚽ Bola",
    "🎮 Videogame", "🎮 Videogame",
    "🦁 Leão", "🦁 Leão",
    "🎸 Guitarra", "🎸 Guitarra",
    "🍌 Banana", "🍌 Banana",
    "🎈 Balão", "🎈 Balão",
    "🚲 Bicicleta", "🚲 Bicicleta",
    "🐢 Tartaruga", "🐢 Tartaruga",
    "🎉 Festa", "🎉 Festa"
]

# Embaralha as cartas
random.shuffle(cards)

# Inicializa o jogo
def initialize_game():
    board = ['*' for _ in range(len(cards))]
    return board

# Mostra o estado atual do jogo
def display_board(board):
    print("Estado atual do jogo:")
    for i in range(0, len(board), 5):
        print(" ".join(board[i:i+5]))
    print()

# Função principal do jogo
def play_memory_game():
    board = initialize_game()
    attempts = 0
    matches = 0

    while matches < len(cards) // 2:
        display_board(board)
        try:
            first_choice = int(input("Escolha a primeira carta (0-29): "))
            second_choice = int(input("Escolha a segunda carta (0-29): "))
            
            if board[first_choice] != '*' or board[second_choice] != '*':
                print("Escolha cartas não reveladas.")
                continue
            
            attempts += 1
            # Revela as cartas escolhidas
            board[first_choice] = cards[first_choice]
            board[second_choice] = cards[second_choice]

            display_board(board)

            if cards[first_choice] == cards[second_choice]:
                print("Você encontrou um par!")
                matches += 1
            else:
                print("Não é um par. Tente novamente.")
                # Oculta as cartas novamente
                board[first_choice] = '*'
                board[second_choice] = '*'

        except (ValueError, IndexError):
            print("Escolha inválida. Tente novamente.")

    print(f"Parabéns! Você encontrou todos os pares em {attempts} tentativas.")

# Inicia o jogo
if __name__ == "__main__":
    play_memory_game()
