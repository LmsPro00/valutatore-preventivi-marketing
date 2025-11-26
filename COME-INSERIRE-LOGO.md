# 🎨 Come Inserire il Logo

## Metodo Semplice (Consigliato)

### 1. Prepara il tuo logo
- Formato consigliato: **PNG** con sfondo trasparente o **SVG**
- Dimensioni consigliate: almeno 200x200px (verrà ridimensionato automaticamente)
- Nome file: `logo.png` (o `logo.svg`)

### 2. Posiziona il file
Copia il tuo logo nella cartella:
```
/Users/salvotrifiro/Desktop/Valutatore Preventivi/public/logo.png
```

### 3. Fatto! 🎉
Il logo apparirà automaticamente in entrambe le pagine (form e risultati)

---

## Personalizzazioni Avanzate

### Cambiare dimensione del logo
Nel file `src/components/ValutatorePreventivi.jsx` e `src/components/RisultatiValutazione.jsx`, modifica:

```jsx
className="h-24 w-auto object-contain"
```

Cambia `h-24` con:
- `h-16` = più piccolo (64px)
- `h-20` = piccolo (80px)
- `h-24` = medio (96px) ← **attuale**
- `h-32` = grande (128px)
- `h-40` = molto grande (160px)

### Aggiungere sfondo al logo
Se vuoi uno sfondo colorato dietro al logo:

```jsx
<div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg mb-6">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="h-24 w-auto object-contain"
  />
</div>
```

### Logo con link
Se vuoi che il logo sia cliccabile:

```jsx
<a href="https://tuosito.it" target="_blank" rel="noopener noreferrer">
  <img 
    src="/logo.png" 
    alt="Logo" 
    className="h-24 w-auto object-contain hover:opacity-80 transition-opacity cursor-pointer"
  />
</a>
```

---

## Formati Supportati
- ✅ PNG (consigliato per loghi con trasparenza)
- ✅ SVG (consigliato per qualità perfetta)
- ✅ JPG (se non serve trasparenza)
- ✅ WEBP (moderno e leggero)

---

## Risoluzione Problemi

### Il logo non appare?
1. Verifica che il file sia in `/public/logo.png`
2. Controlla che il nome sia esattamente `logo.png` (minuscolo)
3. Riavvia il server: ferma con Ctrl+C e rilancia `npm run dev`

### Il logo è troppo grande/piccolo?
Modifica `h-24` come spiegato sopra

### Voglio usare un nome diverso?
Se il tuo logo si chiama `mio-logo.svg`, cambia:
```jsx
src="/logo.png"
```
in:
```jsx
src="/mio-logo.svg"
```
