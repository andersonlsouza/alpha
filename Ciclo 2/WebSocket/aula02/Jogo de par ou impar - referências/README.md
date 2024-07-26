O jogo funciona de acordo com o seguinte diagrama:

```

                    jogadorEntrou                       jogadorEntrou

+-------------------+             +--------------------+              +-------------------+
| Estado Inicial    | -------->   | Jogador 1 Entrou   |---------->   | Ambos os Jogadores|
|  (sem jogadores)  |             |  (1 jogador entrou)|              | Entraram (2 jog.) |
+-------------------+             +--------------------+              +-------------------+ ──┐
                                                                                              │ espectador
       ^                                                                |  |            ▲     │ entrou
       |                                                                |  |            └─────┘
       |                                                                |  |
       |                                                                |  |
       |                                       jogador saiu             |  |
       |                                --------------------------------+  |
       |                                |                                  |
       |                                |                                  v
       |                                v                          +-------------------+ ◄───┐
       |                     +-------------+   jogador saiu        | Esperando Apostas |     │ espectador
       +-------------------  |jogoTerminou |<----------------------| (apostas a entrar)| ────┘ entrou
                             |             |                       +-------------------+
                             +-------------+<--------+                        |
                                                     |                        | novaAposta
                                                     |                        v
                                                     |              +---------------------+
                                                     |              | Uma Aposta Entrou   |
                                                     +--------------|(só 1 jogador apostou|
                                                     jogador saiu   | até agora)          | ◄┐
                                                     ou aposta      +---------------------+  │ espectador
                                                     entrou                            │     │ entrou
                                                                                       └─────┘

```

Um cliente só pode enviar um tipo de mensagem ao servidor: "bet", que serve para fazer uma aposta (num número e numa paridade).

Já os tipos de mensagem que o servidor pode enviar aos clientes são:

1. "playerEntered": Esta mensagem indica que um novo jogador entrou no jogo. Ela é enviada quando um cliente se conecta ao servidor e é adicionado à lista de jogadores. A mensagem inclui se o jogador é o "Jogador 1" ou "Jogador 2".
2. "gameStarted": Esta mensagem é enviada quando dois jogadores entraram na sala de jogo, sinalizando o início do jogo.
3. "spectatorEntered": Esta mensagem é enviada quando um espectador entra no jogo. Espetadores são os jogadores que se conectam após os dois primeiros jogadores.
4. "situation": Esta mensagem fornece o estado atual do jogo para um espectador. Dependendo das apostas dos jogadores, a mensagem poderá informar que está esperando a aposta de um jogador ou ambos.
5. "newBet": Esta mensagem é enviada quando um jogador faz uma aposta. Ela informa a todos que um novo palpite foi feito e por qual jogador.
6. "gameEnded": No final do jogo, uma mensagem é enviada com o tipo "gameEnded". Ela será enviada quando o jogo terminar, que pode ser devido a ambos os jogadores já terem apostado e o vencedor ser calculado, ou um jogador sair do jogo.
7. "badMessage": Esta mensagem é enviada quando o servidor recebe uma mensagem que não consegue reconhecer a partir do cliente.
8. "gameNotStarted": Esta mensagem é enviada quando um jogador tenta apostar antes do jogo ser iniciado. Indica que o jogo ainda não começou.
9. "duplicateBet": Esta mensagem é enviada quando um jogador já fez seu palpite e tenta fazer outra.
10. "spectatorExit": Esta mensagem é enviada quando um espectador deixa o jogo. Informa a todos que um espectador saiu. 
