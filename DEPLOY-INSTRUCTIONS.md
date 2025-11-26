# 🚀 Istruzioni per Deploy su Vercel via GitHub

## Step 1: ✅ COMPLETATO
Repository Git inizializzato e commit effettuato.

## Step 2: Crea Repository su GitHub
1. Vai su https://github.com/new
2. Nome: `valutatore-preventivi-marketing`
3. Descrizione: `Sistema di valutazione preventivi agenzie di marketing`
4. Scegli Public o Private
5. NON selezionare "Initialize with README"
6. Clicca "Create repository"

## Step 3: Collega GitHub
Dopo aver creato il repository, esegui questi comandi nel terminale:

```bash
cd "/Users/salvotrifiro/Desktop/Valutatore Preventivi"

# Sostituisci TUO_USERNAME con il tuo username GitHub
git remote add origin https://github.com/TUO_USERNAME/valutatore-preventivi-marketing.git

git branch -M main

git push -u origin main
```

## Step 4: Deploy su Vercel
1. Vai su https://vercel.com
2. Clicca "Add New" → "Project"
3. Importa il repository GitHub appena creato
4. Vercel rileverà automaticamente che è un progetto Vite
5. Clicca "Deploy"
6. Aspetta 1-2 minuti
7. Il tuo sito sarà online! 🎉

## 🔄 Aggiornamenti Futuri
Ogni volta che fai modifiche:
```bash
git add .
git commit -m "Descrizione modifiche"
git push
```

Vercel farà il deploy automatico! ✨

## 🌐 URL Finale
Vercel ti darà un URL tipo:
- `valutatore-preventivi-marketing.vercel.app`

Puoi anche collegare un dominio personalizzato dalle impostazioni Vercel.
