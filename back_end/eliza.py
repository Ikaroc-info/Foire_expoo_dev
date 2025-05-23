import random

def eliza_fr(entree_utilisateur):
    reponses = {
        "bonjour": ["Bonjour. Comment puis-je vous aider aujourd'hui ?"],
        "maman": ["Parlez-moi davantage de votre mère."],
        "père": ["Parlez-moi davantage de votre père."],
        "je suis": ["Pourquoi dites-vous que vous êtes {} ?"],
        "je veux": ["Pourquoi voulez-vous {} ?"],
        "parce que": ["Est-ce la véritable raison ?"],
        "triste": ["Je suis désolé que vous vous sentiez triste. Pourquoi cela ?"],
        "heureux": ["C'est bien que vous soyez heureux. Qu'est-ce qui vous rend heureux ?"],
        "je pense": ["Pourquoi pensez-vous cela ?"],
    }

    reponses_defaut = [
        "Pouvez-vous développer ?",
        "Dites-m'en plus.",
        "Je vois. Et ensuite ?",
        "Comment cela vous fait-il sentir ?"
    ]

    entree_utilisateur = entree_utilisateur.lower()
    for mot_cle in reponses:
        if mot_cle in entree_utilisateur:
            if "{}" in reponses[mot_cle][0]:
                fin_phrase = entree_utilisateur.split(mot_cle)[-1].strip()
                return reponses[mot_cle][0].format(fin_phrase)
            return random.choice(reponses[mot_cle])
    return random.choice(reponses_defaut)
