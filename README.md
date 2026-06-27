# Petit carnet — guide de mise en ligne (5 minutes, sans coder)

## Ce que contient ce projet
- `public/index.html` → le quiz que ta copine va voir et remplir
- `public/admin.html` → la page où TOI tu consultes ses réponses (protégée par mot de passe)
- `api/save.js` → enregistre chaque réponse
- `api/responses.js` → te renvoie les réponses enregistrées

## Étape 1 — Créer un compte Vercel
1. Va sur https://vercel.com
2. Inscris-toi gratuitement (avec Google, GitHub ou ton email)

## Étape 2 — Déployer le projet
1. Une fois connecté, clique sur **"Add New" → "Project"**
2. Choisis **"Deploy without Git"** (ou glisse-dépose directement ce dossier `vercel-quiz` entier sur la page d'import — Vercel propose un drag & drop)
3. Vercel détecte automatiquement la configuration, clique sur **Deploy**
4. Après ~30 secondes, tu obtiens ton lien, du type `https://petit-carnet-xxxx.vercel.app`

## Étape 3 — Activer le stockage (Vercel Blob)
C'est ce qui permet d'enregistrer ses réponses en ligne.
1. Dans le tableau de bord de ton projet sur Vercel, va dans l'onglet **Storage**
2. Clique sur **Create Database** → choisis **Blob**
3. Donne-lui un nom (ex: `carnet-storage`) et clique sur **Create**
4. Vercel connecte automatiquement le Blob à ton projet (la variable d'environnement est ajoutée toute seule)
5. Va dans **Deployments**, clique sur les trois points du dernier déploiement → **Redeploy** (pour que la connexion au Blob soit bien prise en compte)

## Étape 4 — Mettre un mot de passe sur ta page admin
1. Dans le tableau de bord du projet → **Settings → Environment Variables**
2. Ajoute une variable :
   - Nom : `ADMIN_PASSWORD`
   - Valeur : le mot de passe de ton choix (ex: `monamour2026`)
3. Redéploie une dernière fois (**Deployments → ⋯ → Redeploy**)

## Étape 5 — Utilisation
- **Lien à envoyer à ta copine** : `https://ton-lien.vercel.app`
- **Lien pour toi, pour voir ses réponses** : `https://ton-lien.vercel.app/admin.html`
  → tape ton mot de passe, ses réponses s'affichent, les plus récentes en premier.

## Bon à savoir
- Vercel Blob gratuit offre largement assez d'espace pour ce type d'usage (texte uniquement, des dizaines de milliers de réponses possibles)
- Tu peux changer les questions directement dans `public/index.html`, dans la partie `const questions = [...]`
- La musique se lance automatiquement dès qu'elle touche l'écran une première fois (contrainte technique des iPhones : aucun son ne peut démarrer sans interaction)

## Mettre ta propre musique
1. Prends ton fichier audio et renomme-le exactement `musique.mp3`
2. Place-le dans le dossier `public/`, au même niveau que `index.html` et `admin.html`
3. Redéploie le projet (sur Vercel : glisse à nouveau le dossier, ou si tu as connecté un repo Git, fais un nouveau commit + push)
4. C'est tout — le site joue automatiquement ce fichier en boucle dès le premier tap

**Si le fichier est absent ou mal nommé**, le site bascule automatiquement sur une petite mélodie douce générée, donc il n'y a jamais d'erreur visible pour ta copine.

**Format conseillé** : mp3, quelques Mo maximum, pour que ça charge vite sur mobile (évite les fichiers de plus de 5-8 Mo).

**Point légal à connaître** : si ta musique est une chanson commerciale protégée par des droits d'auteur, l'héberger sur un site, même privé, n'est techniquement pas autorisé. Le risque est très faible pour un usage aussi personnel et confidentiel, mais privilégie un enregistrement perso ou une musique libre de droits si tu veux être au clair là-dessus.
