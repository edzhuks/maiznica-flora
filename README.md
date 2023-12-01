www.maiznica.lv

The application is a webstore for a bakery. Specifically it is a webstore for the bakery where my mother works. I told her I was doing this project and she suggested I make a webstore for them. I did not seriously expect to launch the application in the beginning but in the end it was functional enough that I put in some extra effort to make it production-ready and. The store was launched on 27.11.2023 and it replaced their previous website.

The website is built with a React frontend and express mackend. It also includes DPD integration for shipping and SEB integration for payments. In terms of functionality it has a product catalogue with categories that can be managed by admins from the same frontend. There are also user profiles, carts and orders. For carts and localization in the frontend I'm using redux. The backend also sends emails from a company email, for example for email verification or order receipts. The database is local for production and mongo atlas for development. I had a pipeline set up to deploy to render, but render was not a good fit for production. Production is running on a CentOS VPS with some scripts - to backup the database hourly and daily and to restart the service with the newest commit. I cannot take full credit for the VPS since my father set it up. The course was still suggesting create-react-app when I started so it was used here. I might move the project to Next.js or something else in the future.

Hours are in hours.md. I stopped counting after reaching 180 hours and after that it was a priority to launch the store before the first advent, which is why I submitted it so late. I am still working to improve the website.

Since customers only see about half of the website below are some screenshots from the management parts.

Catalogue page - overview of the whole main category tree
![](/readme-images/catalogue.png)
![](/readme-images/catalogue-lower.png)

Uncategorized products and categories
![](/readme-images/uncategorized.png)

Page for creating and editing products with live preview
![](/readme-images/new-edit-product.png)

Page for creating and editing categories with live preview
![](/readme-images/new-edit-category.png)

Page for reordering categories and products with drag and drop
![](/readme-images/sorting.png)

Banner management
![](/readme-images/banners.png)

Settings. For now only who should receive notifications
![](/readme-images/settings.png)

Order management page (test purchase). DPD integration is not complete yet.
![](/readme-images/orders.png)
