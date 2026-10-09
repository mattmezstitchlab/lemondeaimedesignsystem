# LE MONDE AIME® — Design System Lab

## État
Page HTML **indépendante** dans `index.html`, avec `design-system.css`, `design-system.js` et `component-lab.js`. Aucun changement dans `matt-mez-admin`, aucune connexion métier et aucune publication Base44.

## Source & limites
- La maquette validée est la référence visuelle ; `index 9.html` reste une archive intacte.
- Direction actuelle : **DM Sans** (corps), **Manrope** (titres), vert profond `#1f3f28`, accent `#a3d65c`, sable `#f6f7f5`, texte `#485563`, bordures `#e5e7eb`, focus `#537d36`. Les boutons utilisent le vert sombre `#192e28`.
- Le symbole floral plein reprend `#i-flower` de l’archive ; le mot-symbole sur deux lignes est reconstruit typographiquement, pas un fichier officiel fourni.
- Les photographies externes servent uniquement à visualiser les proportions ; aucune licence d'exploitation n'est présumée.
- Les interactions sont locales : chips, menu mobile, boutons en chargement, formulaire validé, assistant avec erreur simulée et téléchargement d’une fiche fictive.
- L’atelier utilise un renderer partagé entre vue publique (version enregistrée en mémoire), brouillon et mobile. Sauvegarde/erreur/reset sont simulés ; aucune persistance au rechargement, aucune publication.
- Les médias comprennent un carrousel manuel, une fiche galerie en modale et un lecteur vidéo local. L’import vidéo utilise un object URL sur l’appareil, sans upload. Aucun URL vidéo de production n’est inventé.

## Compatibilité Matt Mez Sax
**Audit tenté le 9 octobre 2026, non abouti.** Chromium renvoie `net::ERR_NAME_NOT_RESOLVED` sur `https://mattmezsax.base44.app` ; curl confirme l’échec DNS. Les captures aux largeurs 375, 390, 768, 1024 et 1440 px sont uniquement des diagnostics d’erreur conservés dans `/tmp/mattmez-audit`, pas des captures du site et pas des preuves de son apparence.

L’accès GitHub à `mattmezstitchlab/matt-mez-admin` renvoie 404. Les fichiers React, CSS, imports Lucide, contrats de données et différences public/éditeur n’ont donc pas pu être lus. Aucun écran privé ou authentifié n’a été inspecté visuellement.

La version antérieure de cette documentation rapportait un thème sombre, `.atelier-clair`, Space Grotesk / Inter dans `src/index.css`, et une vidéo avec assistant dans `src/components/landing/Hero.jsx`. Ces informations sont **antérieures, non revérifiées**, pas des observations de cette session.

L’inventaire visible dans `index.html#audit` couvre chaque famille demandée avec son statut non vérifié. La comparaison `#comparaison` ne fabrique pas d’écran « avant ». La matrice `#matrice` distingue Landing publique, éditeur, assistant, espace client et administration ; les noms de fichiers demandés sont des cibles à localiser, pas des chemins confirmés.

Pour terminer l’audit réel, fournir un accès en lecture au dépôt et un accès réseau au site (ou des captures autorisées). Ne **jamais** appliquer globalement les variables ou styles de ce laboratoire aux thèmes existants.

### Stratégie sûre
1. Arena s'appuie sur `index.html` pour proposer une **maquette uniquement**.
2. Vérifier les contrats public/éditeur et les icônes réelles avant de déclarer un composant compatible. Conserver vidéo hero, INSTANTS, conversation, demandes, devis, documents, données et permissions.
3. N'extraire que les styles approuvés dans un namespace Landing dédié. Ne pas copier `:root` ou les styles de balises du laboratoire dans l’application.
4. Capturer des comparaisons aux largeurs 320, 375, 390, 430, 768, 1024 et 1440 px.
5. Tester clavier, scroll interne du chat, contraste, PDF/devis, formulaires, navigation et gestion des erreurs.
6. Créer une PR dédiée dans `matt-mez-admin` **uniquement après validation** ; aucun merge ou déploiement automatique.

## Note pour Arena
> Reprends les principes visuels de LE MONDE AIME Design System Lab (Manrope / DM Sans, fond blanc, espaces généreux, accent lime discret, composants compacts). Produis une proposition visuelle de la Landing Matt Mez Sax, sans copier les contenus LE MONDE AIME ni toucher au moteur de réservation ou à l'administration. Ne modifie aucune donnée, aucun rôle, aucun backend et n'effectue aucune publication. Fournis un avant/après responsive et les écarts explicitement proposés avant toute intégration.

## Contrôle de qualité à faire avant adoption
Comparer le logo officiel avec la reconstruction ; vérifier les licences média et le chargement des fonts. Contrôler la bibliothèque et l’atelier à 375, 390, 768, 1024 et 1440 px, le clavier, les contrastes, la réduction des animations et les parcours fonctionnels en environnement isolé.

Scénarios : menu mobile puis Échap ; chips actif/désactivé ; boutons et chips en chargement ; erreurs du formulaire puis correction/reset ; assistant indisponible puis retry sans perte de texte ; carrousel aux flèches ; modale avec retour du focus ; import vidéo locale valide/invalide ; brouillon différent du public puis sauvegarde réussie/échouée ; changement pendant sauvegarde et réinitialisation ; navigation des onglets aux flèches/Home/End ; texte HTML affiché sans interprétation.

Il n’existe pas de suite de tests, build ou linter configurés dans ce dépôt statique. Vérifications disponibles : syntaxe JavaScript avec Node, `git diff --check`, navigateur installé, scan des secrets et CodeQL. Les médias et polices externes peuvent être bloqués dans l’environnement de vérification ; ne pas confondre un layout testé avec une disponibilité média confirmée.

## Vérifications réalisées le 9 octobre 2026

- Chromium : aucun débordement de page à 375, 390, 768, 1024 et 1440 px ; tableau défilant isolé. Captures locales du laboratoire dans `/tmp/design-system-verification/design-system-{largeur}.png` ; elles ne représentent pas le site Matt Mez Sax.
- Menu/Échap, onglets/flèches/Home/End, formulaires invalides puis valides/reset, chat erreur/retry sans perte de texte, scroll et hauteur stable, chips et boutons en chargement, carrousel, modale et retour du focus.
- Renderer identique pour brouillon/mobile ; vue publique inchangée avant sauvegarde. Succès, erreur, reset pendant sauvegarde et modifications concurrentes testés ; aucune persistance après rechargement.
- Saisie HTML rendue en texte (chat et titre édité), pas d’interprétation. Focus doux sur tous les types de champs et couleurs forcées ; animations réduites.
- Contrastes : texte 7,62:1, bouton 14,36:1, sélection 8,43:1, erreur 7,19:1, focus 4,82:1.
- Vidéo WebM locale de démonstration : chargement, lecture sur action utilisateur et pause ; fichier non vidéo rejeté, aucun upload.
- Limites : polices/photos externes non chargées dans le sandbox ; audit du site et du dépôt bloqué ; Safari/iOS/Android et fonctions métier non vérifiés.
