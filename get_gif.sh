#!/bin/bash

# Dossier de sortie
OUTPUT_DIR="img"
mkdir -p "$OUTPUT_DIR"

# Durée du GIF (en secondes)
DURATION=5

# Liste des vidéos YouTube à traiter (ajoute tes liens ici)
VIDEOS=(
    # "https://www.youtube.com/watch?v=dXxtG0hrdls"
    "https://www.youtube.com/watch?v=RlHAMa2Zh_M"
    # "https://www.youtube.com/watch?v=7fmVZ7J58q8"
    # "https://www.youtube.com/watch?v=YRRhLvk12NU"
)

# Vérifie si yt-dlp et ffmpeg sont installés
if ! command -v yt-dlp &> /dev/null; then
    echo "Erreur : yt-dlp n'est pas installé. Installe-le avec : sudo apt install yt-dlp"
    exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
    echo "Erreur : ffmpeg n'est pas installé. Installe-le avec : sudo apt install ffmpeg"
    exit 1
fi

# Fonction pour télécharger une vidéo et générer un GIF
generate_gif() {
    local url="$1"
    local id=$(echo "$url" | grep -o "v=[^&]*" | cut -d'=' -f2) # Récupère l'ID de la vidéo
    local video_file="$OUTPUT_DIR/$id.mp4"
    local gif_file="$OUTPUT_DIR/$id.gif"

    echo "📥 Téléchargement de la vidéo : $url"
    yt-dlp -f "best[height<=360]" -o "$video_file" "$url"

    if [[ ! -f "$video_file" ]]; then
        echo "❌ Échec du téléchargement pour $url"
        return
    fi

    echo "🎥 Extraction des $DURATION premières secondes..."
    ffmpeg -y -t $DURATION -i "$video_file" -vf "fps=10,scale=320:-1:flags=lanczos" -c:v pam -f image2pipe - | \
        convert - -layers Optimize -delay 10 -loop 0 "$gif_file"

    echo "✅ GIF généré : $gif_file"

    # Supprime la vidéo temporaire pour économiser de l'espace
    rm -f "$video_file"
}

# Boucle sur toutes les vidéos
for video in "${VIDEOS[@]}"; do
    generate_gif "$video"
done

echo "🎉 Tous les GIFs sont prêts dans le dossier '$OUTPUT_DIR'."
