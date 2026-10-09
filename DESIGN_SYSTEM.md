# LE MONDE AIME® — Design System Lab

## État
Prototype **indépendant** sur la branche `design-system-lab`, dans `index.html`. Aucun changement dans `matt-mez-admin` et aucune publication Base44.

## Source & limites
- La page originale `index 9.html` reste intacte et fait autorité pour le dessin initial.
- Valeurs extraites : **DM Sans** (corps), **Manrope** (titres), `#20231f`, `#71756d`, `#e6e7e1`, `#f5f5f1`, `#d4ed9c`, `cubic-bezier(.22,1,.36,1)`.
- Le pictogramme floral de cette page de laboratoire est une **interprétation provisoire**, pas le logo SVG original exact. Récupérer le symbole `#i-flower` du HTML de référence avant toute généralisation.
- Les photographies externes servent uniquement à visualiser les proportions ; aucune licence d'exploitation n'est présumée.
- Les boutons du laboratoire sont des exemples de design, pas des actions réelles. Le prototype conversationnel affiche les messages localement et ne contacte pas de serveur.

## Compatibilité Matt Mez Sax
Inspection ciblée : `matt-mez-admin/src/index.css` conserve un thème sombre racine, une classe `.atelier-clair`, les polices **Space Grotesk** et **Inter** et un ensemble de variables de composants. `src/components/landing/Hero.jsx` utilise une vidéo et l'assistant public. Ne **jamais** appliquer globalement les variables ou classes de ce laboratoire aux thèmes existants.

### Stratégie sûre
1. Arena s'appuie sur `index.html` pour proposer une **maquette uniquement**.
2. Conserver la vidéo hero, les deux parcours, la conversation, les données, les documents et les permissions.
3. N'extraire que les styles approuvés et les appliquer dans un namespace dédié à la Landing.
4. Capturer des comparaisons aux largeurs 320, 375, 390, 430, 768, 1024 et 1440 px.
5. Tester clavier, scroll interne du chat, contraste, PDF/devis, formulaires, navigation et gestion des erreurs.
6. Créer une PR dédiée dans `matt-mez-admin` **uniquement après validation** ; aucun merge ou déploiement automatique.

## Note pour Arena
> Reprends les principes visuels de LE MONDE AIME Design System Lab (Manrope / DM Sans, fond blanc, espaces généreux, accent lime discret, composants compacts). Produis une proposition visuelle de la Landing Matt Mez Sax, sans copier les contenus LE MONDE AIME ni toucher au moteur de réservation ou à l'administration. Ne modifie aucune donnée, aucun rôle, aucun backend et n'effectue aucune publication. Fournis un avant/après responsive et les écarts explicitement proposés avant toute intégration.

## Contrôle de qualité à faire avant adoption
Comparer le logo original avec celui du laboratoire ; inspecter les contrastes (lime sur blanc en particulier) ; vérifier les licences média, le chargement de fonts, la réduction des animations, et les parcours fonctionnels en environnement isolé.
