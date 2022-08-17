## Localisation ##

Traduire sur place a été localisé à l'aide de Traduire sur place. S'il y a des traductions qui pourraient être améliorées, veuillez me les envoyer pour que je les corrige. Merci!


**Traduire Sur Place** (TSP) traduira le texte en surbrillance dans la langue cible actuellement sélectionnée. TSP est optimisé par Google Translate et *votre propre* clé Google \"Cloud Translation API\". Ma compréhension de leur prix (au moment où cela a été écrit) est qu'il est gratuit pour les 500 000 premiers caractères/mois.

Étant donné que Google Cloud propose des centaines de services, la configuration d'une clé d'API Cloud Translation demande un peu d'effort dans un labyrinthe quelque peu compliqué, mais j'ai essayé de documenter le processus ci-dessous. Cela devrait prendre environ 10 minutes.

Les tarifs de Google Cloud ne sont pas clairs, vous devez donc vous familiariser avec les tarifs tels qu'ils les décrivent (et non tels que je les décris) et continuer à surveiller ce qui vous est facturé (par exemple, via leur "Budget et Alertes" paramètre) [Tarification de la traduction dans le cloud](https://cloud.google.com/translate/pricing)

![Comment utiliser Translate Sur Place en 3 étapes](https://ext.runcode.run/tip/readme/TIP_howto.png)

## Préférences ##

Votre clé Google "Cloud Translate API" doit être saisie dans les préférences *Extension*.

La langue de et vers laquelle vous traduisez est définie dans les préférences du *Projet*. (Il ne détecte pas automatiquement la langue source pour le moment.)

![Préférences de langue du projet](https://ext.runcode.run/tip/readme/TIP_project_prefs.png)

## Enregistrement d'une clé Google 'Cloud Translate API' ##

Créez un compte Google Cloud si vous n'en avez pas déjà un.

Selon ce que vous avez déjà configuré avec Google, les étapes pour ajouter leur API de traduction peuvent varier. Le processus est un peu mystérieux mais ne devrait vous prendre que 10 minutes. J'espère que le plan ci-dessous est suffisant pour que la plupart des gens commencent mais, malheureusement, je ne peux pas offrir de support technique si cela ne fonctionne pas. (Ma famille m'occupe assez sur ce front. :-) )

Si vous souhaitez tester votre clé API, vous pouvez la remplacer par cette URL. Si cela fonctionne dans l'URL, cela devrait fonctionner dans cette extension. Si ce n'est pas le cas, la clé API n'a pas été configurée correctement.

    https://www.googleapis.com/language/translate/v2?key=YOUR_API_KEY&source=en&target=es&q=Hello+World

Pour créer une clé d'API, démarrez sur [la page de l'API Cloud Translate](https://cloud.google.com/translate/).

- À partir de cette page, cliquez sur le gros bouton bleu "Essayer la traduction gratuitement". (Vous devrez peut-être vous reconnecter, etc.)

- Confirmez votre pays, organisation, acceptez les termes, vérification d'identité (message texte).

- Confirmez les détails du paiement par carte de crédit (peut-être pas débité, mais nécessaire pour ouvrir le compte).

- Si une boîte de dialogue indiquant "Commencer avec un didacticiel interactif" s'affiche, cliquez sur : "Ignorer pour l'instant".

- Depuis le menu de gauche (ou éventuellement depuis le menu déroulant "hamburger" dans le coin supérieur gauche), cliquez sur "API et services" > "API activées".

- S'il s'agit d'un nouveau compte, vous devez "Démarrer un projet" pour y intégrer le service d'API de traduction. (Pour moi, cela s'est produit et n'est jamais revenu. Plusieurs erreurs système Google. J'ai dû recommencer.)

- Une fois votre projet créé, retournez dans "API et services activés". Google semble permettre à une pile d'API de démarrer. Je les ai tous désactivés. (Fatigué. Il est plus rapide d'ouvrir chaque service dans un nouvel onglet, puis de les parcourir et de les désactiver onglet par onglet, car la désactivation prend quelques secondes chacune.)

- Accédez à la bibliothèque d'API (si vous venez de supprimer toutes les autres API, cela devrait vous inviter à y accéder) et recherchez "l'API Cloud Translation". Activez-le et cela devrait vous ramener aux paramètres de cette API dans votre compte.

- Sur l'écran de configuration de l'API Cloud Translate, il peut afficher une alerte vous indiquant que vous devez créer des informations d'identification.

- (REMARQUE : avec le recul, cette étape suivante n'a peut-être pas été nécessaire.) Cliquez sur le bouton bleu "Créer des informations d'identification" dans la bannière. Créez des informations d'identification pour l'API Cloud Translation, probablement avec les options "Données d'application", "Non, je ne les utilise pas" (mais lisez les détails par vous-même). Donnez un nom au service (par exemple, "traduire"). Cliquez sur terminé et cela créera un "compte de service".

- Cliquez sur le lien "Identifiants" dans la barre de navigation de gauche. En haut de l'écran, cliquez sur le lien/menu déroulant « Créer des informations d'identification » et sélectionnez « Clé API » dans le menu. Une clé API sera créée. ** Copiez-le ! C'est ce que vous devez mettre dans les préférences de cette extension pour la faire fonctionner.**

ÉTAPES SUPPLÉMENTAIRES
- Comme indiqué dans la boîte de dialogue de création de clé API, la clé est probablement illimitée. Vous pouvez cliquer sur "Modifier la clé API" dans cette boîte de dialogue pour la limiter aux seuls services que vous utilisez.

- Vous pouvez configurer un moniteur "Budget et alerte" pour vous envoyer un e-mail lorsque vous approchez de votre limite (j'ai défini le mien sur 1 $ car je m'attends à ce que ma traduction doive se situer bien dans le niveau "gratuit").

J'espère que cela a abouti à une clé API fonctionnelle pour vous ! J'ai créé un compte deux fois juste pour m'assurer que les étapes fonctionnaient de manière cohérente, mais si la clé ne fonctionne pas pour vous... J'ai bien peur de ne pas en savoir assez sur Google Cloud pour suggérer comment y remédier.

## Garantie ##

Aucun! Bien que rien n'ait été fait pour compromettre délibérément la sécurité de votre clé API (qui est stockée en texte clair dans les préférences de cette extension), ou délibérément mal traduire votre texte en quelque chose de dénué de sens ou même grossier, ces choses pourraient arriver. En utilisant cette extension, vous acceptez que tout ce qui se passe que vous n'aimez pas à la suite de l'utilisation de Translate in Place n'est pas de la responsabilité du développeur.
