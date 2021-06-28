const fetch = require('node-fetch') // On importe le module node-fetch
const fs = require('fs');
const googleTTS = require('google-tts-api');
module.exports.run = async (client, message, args) => {
    const reason = (args.splice(0).join(' ') || 'Merci d\'indiquer un message!');


    // get audio URL
    const url = googleTTS.getAudioUrl(`${reason}`, {
        lang: 'fr', // vous pouvez changer le language via la liste disponible sur google api.
        slow: false, // est-ce-que la voix va etre lente , recommandé : false
        host: 'https://translate.google.com', // ne pas toucher
    });
    await (async function () { // Une fonction asynchronne 
        const req = await fetch(url)
        // Ici on fetch le serveur de google pour récupèrer le fichier audio qui sera dans le body
        req.body.pipe( // La fonction pipe va gérer le décallage entre la vitesse de lecture et d'écriture dans le fichier
             fs.createWriteStream('message.mp3') // On écrit dans le fichier et on lui donne le nom de file.mp3
        );
    })()
    message.channel.send(
        {
            files: [
                { attachment: "message.mp3", name: 'say.mp3' }
            ]
        }
    )

}

module.exports.help = {
    name: 'say', // Défini le nom de la commande
    aliases: [''], // Défini ces alias [Plus tard pour le s!help]
    category: 'Misc', // Défini sa catégorie [Plus tard pour le s!help]
    description: 'envoie un mp3 dans le channel', // Défini sa description [Plus tard pour le s!help]
    cooldown: 7, // Défini le cooldown de la commande (en secondes)
    usage: '', // Utilisation de la commande {Exemple : si la commandes est s!ban <@pseudo> mettre : <@pseudo>}
    isUserAdmin: false, // Vérifie si l'utilisateur a visé a les permissions
    permissions: false, // Vérifie si l'utilisateur a besoin des permissions pour utiliser la commande
    args: false // Vérifie si la commande a besoin d'arguments
}