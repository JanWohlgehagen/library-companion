cd C:\Users\tobia\Documents\Skole\Frontend\library-companion
docker build -t janwohlgehagen/library-companion . -f frontend/Dockerfile
docker push janwohlgehagen/library-companion
docker run -d -p 8100:8100 janwohlgehagen/library-companion 
