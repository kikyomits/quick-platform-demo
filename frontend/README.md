# Test

```sh
docker run --rm -it \
  -p 8880:80 \
  -v $(pwd):/usr/share/nginx/html \
  -w /usr/share/nginx/html \
  nginx:alpine 
```

# Build

```sh
docker build -t demo-front:alpine
```


# Run

```sh
docker run --rm -it \
  -p 8880:80 \
  demo-front:alpine
```