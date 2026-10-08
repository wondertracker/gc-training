# Grande Charte · La Maison, en pratique

V2 du parcours interne. Six modules, en français et en anglais, avec quatre étapes de lecture, trois questions de connaissances et une mise en situation écrite par module.

## Ce qui change

- Ambiance claire par défaut, bleu Maison et préférence de l’appareil. Choix conservé localement, sur tous les écrans.
- Visuels réels de la Maison, navigation mobile, bibliothèque des repères avec recherche.
- Reprise à l’étape quittée, réponses et carnet personnels sur l’appareil, export texte.
- Contenu resserré et corrigé à partir de la brochure GC Brochure Pro 3. GC-5 2004 et 2007 à 3,6 g/L ; rosé GC-5 à 8 g/L. Les quantités sont les tirages des éditions, jamais un stock disponible.
- Iroise : 769 jours et 60 mètres pour l’immersion historique. Distinction entre faits, observations sensorielles et hypothèses. Les nouvelles immersions ne reprennent pas automatiquement ces paramètres.
- Conversation fondée sur l’écoute, précision commerciale et suivi concret. Une formation ne confère pas un mandat de représentation.
- Tous les modules sont consultables. L’ordre est conseillé, sans verrou de lecture.
- Attestation limitée aux vérifications de connaissances. Seuil existant conservé : 2/3. Les situations sont auto-évaluées, sans correction humaine ni prétention à une certification pratique.
- Résultats calculés et enregistrés côté serveur. Les erreurs de sauvegarde sont visibles ; les nouvelles tentatives conservent le meilleur score et la première date de validation.
- Administration bilingue et adaptée au mobile. Les indicateurs décrivent la progression et les meilleurs scores, pas une présence en ligne.
- Next.js 16.4.0 et React 19.3.0. Paramètres de route et cookies asynchrones, proxy de session. Compilation Webpack conservée pour cette livraison.

## Décision sur les accès

La connexion et l’inscription Supabase existantes sont conservées. Aucun nouveau statut « en attente », circuit d’approbation ou compte administrateur n’est créé. L’approbation par Philippe seul est reportée à une étape ultérieure.

Le schéma existant ne sépare pas les résultats par version du contenu. Les meilleurs scores cumulés et les attestations historiques restent disponibles. Ils ne sont pas présentés comme de nouvelles validations du contenu V2. Les anciens fichiers de contenu V1 et la maquette JSX restent des archives ; les routes actives utilisent `lib/training/content-v2.ts`.

## Lancer et vérifier

Node.js 22 ou version ultérieure. Installer avec `npm ci`, puis :

```sh
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

`/preview` donne accès aux six modules, aux questionnaires, à la recherche et au carnet sans compte, uniquement en développement. Les scores de cet aperçu ne sont pas transmis à Supabase. Les routes `/preview` renvoient 404 dans une version de production.

## Configuration existante

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` : accès public au projet Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` : uniquement côté serveur, nécessaire à l’enregistrement contrôlé et à l’administration. Ne jamais l’exposer au navigateur.
- `NEXT_PUBLIC_APP_URL` : origine publique utilisée dans les liens d’attestation.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` : envoi demandé par le titulaire de l’attestation vers son propre e-mail. L’expéditeur doit être configuré. En son absence, le document reste consultable et imprimable ; l’interface indique que l’envoi n’est pas configuré.

Les secrets existants restent dans leur configuration sécurisée. La publication utilise le projet Vercel et le projet Supabase existants, sans ajouter de circuit d’approbation des inscriptions.

## Limites et suite

1. Tester la connexion, une tentative complète, la reprise des scores et l’attestation avec un compte de test sur le véritable projet Supabase avant publication. Les essais locaux de la V2 ne prouvent pas ce fonctionnement distant.
2. Vérifier les politiques réellement déployées. La migration historique `001_initial.sql` permet trop de modifications directes et contient des politiques d’administration récursives. Le nouveau contrôle côté serveur ne bloque pas, à lui seul, des écritures directes autorisées par une ancienne politique. La correction des permissions de données est distincte du futur circuit d’approbation des inscriptions. La migration `training_v2_server_owned_results` limite les participants à la lecture de leurs données et à la modification de leur nom/langue. Le rôle, les scores et les attestations sont écrits par le serveur. Les fonctions réservées aux déclencheurs ne sont plus appelables depuis le navigateur.
3. Vérifier l’expéditeur d’e-mail et la réception effective. Aucun e-mail n’a été envoyé pendant les contrôles.
4. Ajouter la vidéo de la nouvelle immersion avec sa date et les paramètres confirmés. Le parcours actuel indique que cette vidéo est à venir.
5. Compléter les consignes de service propres aux cuvées à partir des recommandations validées de la Maison. La V2 ne fabrique pas de température ou de durée de garde universelle.
6. Les polices de la Maison sont recherchées localement, avec des replis Helvetica/Arial. Aucun fichier propriétaire de police n’est distribué dans cette version.
7. Avant un déploiement commercial, vérifier l’éligibilité de l’hébergement choisi. La V2 ne change aucun abonnement.

Référence technique de migration : [guide officiel Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16).
