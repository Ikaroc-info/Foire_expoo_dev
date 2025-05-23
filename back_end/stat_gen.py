import re
import random
from collections import defaultdict


def extracteur_texte(nom_fichier):
    chemin_fichier = f"./data_stats/{nom_fichier}.txt"
    """
    Extrait le texte d'un fichier texte.
    :param chemin_fichier: Chemin du fichier texte.
    :return: Contenu du fichier texte.
    """
    with open(chemin_fichier, "r", encoding="utf-8") as f:
        return f.read()


def tokenizer(texte):
    texte = texte.lower()
    return re.findall(r"\b\w+\b", texte)


# === Construction du modèle n-gramme ===
def construire_modele(tokens, n):
    model = defaultdict(list)
    for i in range(len(tokens) - n):
        prefix = tuple(tokens[i : i + n - 1])
        next_word = tokens[i + n - 1]
        model[prefix].append(next_word)
    return model


def stat_generation(string_initiale, liste_corpus, n=2, longueur=50):
    # === Préparation des tokens à partir de tous les corpus ===
    tokens = []
    # === Filtrer les fichiers de la liste ===
    mappings: dict[str, str] = {"Harry Potter": "harry_potter", "La bible": "bible"}
    for titre in liste_corpus:
        if titre in mappings:
            texte = extracteur_texte(mappings[titre])
            tokens.extend(tokenizer(texte))
        else:
            continue

    # === Construction du modèle ===
    modele = construire_modele(tokens, n=n)

    # === Initialisation avec la string_initiale ===
    prefix_tokens = tokenizer(string_initiale)
    prefix = (
        tuple(prefix_tokens[-(n - 1) :])
        if len(prefix_tokens) >= n - 1
        else random.choice(list(modele.keys()))
    )
    generated = list(prefix)

    # === Génération du texte ===
    for _ in range(longueur):
        next_words = modele.get(prefix)
        if not next_words:
            break
        next_word = random.choice(next_words)
        generated.append(next_word)
        prefix = tuple(generated[-(n - 1) :])

    return " ".join(generated)


print(stat_generation("voir", ["Harry Potter", "La bible"], n=3, longueur=50))
