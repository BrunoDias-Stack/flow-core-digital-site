# Publicacao - Flow Core Digital

Site local validado:

- `http://127.0.0.1:4173/`

Dominio alvo:

- `https://flowcoredigital.com/`

## Arquivos do site

Este pacote e um site estatico puro:

- `index.html`
- `style.css`
- `script.js`
- `assets/hero-development.png`
- `robots.txt`
- `sitemap.xml`
- `CNAME`

O formulario abre um e-mail preenchido para:

- `contact@flowcoredigital.com`

## Situacao atual do dominio

O dominio ainda aponta o site para Squarespace:

```txt
flowcoredigital.com A 198.185.159.144
flowcoredigital.com A 198.185.159.145
flowcoredigital.com A 198.49.23.144
flowcoredigital.com A 198.49.23.145
www.flowcoredigital.com CNAME ext-sq.squarespace.com
```

O e-mail esta em Google Workspace:

```txt
MX  smtp.google.com  prioridade 1
TXT v=spf1 include:_spf.google.com ~all
TXT google._domainkey.flowcoredigital.com  DKIM publicado
```

Nao remova os registros de e-mail ao publicar o site.

## Opcao A - Continuar no Squarespace

Use esta opcao se quiser manter o site hospedado no Squarespace.

Importante: o Squarespace padrao nao publica automaticamente estes arquivos HTML/CSS/JS como um site estatico completo. Nesse caso, recrie as secoes no editor visual do Squarespace usando este pacote como referencia de conteudo e layout.

Antes de divulgar, corrija o SSL no Squarespace:

1. Abra `Squarespace > Domains`.
2. Clique em `flowcoredigital.com`.
3. Confirme que o dominio esta conectado ao site correto.
4. Abra o painel de SSL.
5. Garanta que esteja como `Secure`.
6. Confirme que o certificado esta `Issued` ou `Active`.
7. Teste em janela anonima:
   - `https://flowcoredigital.com`
   - `https://www.flowcoredigital.com`

## Opcao B - Hospedagem estatica recomendada

Use esta opcao se quiser publicar exatamente estes arquivos.

Provedores adequados:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

Fluxo:

1. Crie um projeto/site no provedor escolhido.
2. Envie o conteudo desta pasta ou o ZIP `flow-core-digital-site-static.zip`.
3. Configure o custom domain `flowcoredigital.com`.
4. Configure tambem `www.flowcoredigital.com`.
5. No Squarespace DNS, substitua apenas os registros web:
   - Remova os 4 registros `A` do Squarespace para `@`.
   - Remova o `CNAME www -> ext-sq.squarespace.com`.
   - Adicione os registros pedidos pelo novo provedor.
6. Mantenha MX, SPF, DKIM e DMARC.
7. Aguarde propagacao.
8. Teste HTTPS.

## Depois da publicacao

1. Adicione ou confirme DMARC:

```txt
Tipo: TXT
Nome: _dmarc
Valor: v=DMARC1; p=none; rua=mailto:contact@flowcoredigital.com; adkim=s; aspf=s
```

2. Configure Google Search Console com propriedade de dominio:

```txt
flowcoredigital.com
```

3. Envie o sitemap:

```txt
https://flowcoredigital.com/sitemap.xml
```

4. Configure Google Analytics:

```txt
https://flowcoredigital.com
```

5. So divulgue no Instagram e Google Business Profile depois que HTTPS estiver sem aviso de seguranca.

