# octocommerce

## How to run localy

### Clone and Install dependencies

```bash
git clone git@github.com:MahdadGhasemian/octocommerce.git
cd ./octocommerce
chmod +x ./install-dependencies.sh
./install-dependencies.sh
```

### Run Backend

```bash
docker-compose up # --build
```

### Run Frontend (Admin Panel)

```bash
cd ./octocommerce/frontend/panel
pnpm run dev
```

### Run Frontend (Store Websote)

```bash
cd ./octocommerce/frontend/website
pnpm run dev
```

### Web UI Tools

- [Admin Panel](http://localhost:3000/)
- [Store](http://localhost:3001/)

- [Auth Doc](http://localhost:4000/auth/docs#)
- [Bot Doc](http://localhost:4000/bot/docs#)
- [File Doc](http://localhost:4000/file/docs#)
- [Notification Doc](http://localhost:4000/notification/docs#)
- [Storage Doc](http://localhost:4000/storage/docs#)
- [Store Doc](http://localhost:4000/store/docs#)

- [PgAdmin](http://localhost:8088/)
- [Rabbitmq UI](http://localhost:15678/)
- [Redis GUI](http://localhost:5548/)
- [Minio UI](http://localhost:9001/)

## Infrastructure (lightweight for demo)

```bash
cd ./infrastructure_lightweight
ansible-playbook playbooks/check_connection.yml -i inventory.yml
ansible-playbook playbooks/setup.yml -i inventory.yml
```

### Web UI

- [PgAdmin](https://pgadmin.octocommerce.ir/)
- [Rabbitmq UI](https://rabbitmq.octocommerce.ir/)
- [Redis GUI](https://redisinsight.octocommerce.ir/)
- [Minio UI](https://minio.octocommerce.ir/)

### Generate .htpasswd file for redis inside login page

```bash
htpasswd -c ./roles/services/files/.htpasswd admin
```

### Redis connection

- host: redis
- port: 6379
- username: leave it empty (default)
-
