Hallo Marcus,

1. Angular installieren. Das steht grob in der Arbeit, aber hier ist es genauer:
https://angular.io/guide/setup-local

2. Wenn du das Projekt als .zip runterlädst, fehlen die npm Packages. Wenn du das direkt über deine IDE aus Gitlab ziehst, sollte alles passen.
Wenn etwas nicht stimmen sollte, einfach ins Rootverzeichnis des Ordners gehen und bspw. über die Git Bash "npm -install" eingeben.

3. Die UI starten: 
	über eine Kommandozeile: 
	"cd" in den LASSO_User_Interface Ordner
	dann: "ng serve -o"
 
Die UI wird gebaut und dein Browser sollte sich von alleine öffnen.

Folgende Links sind zugänglich:
http://localhost:4200/login
http://localhost:4200/lsleditor
http://localhost:4200/myLsl
http://localhost:4200/repository


