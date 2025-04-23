# octocommerce

## How to run localy

```bash
git clone git@github.com:MahdadGhasemian/octocommerce.git
cd ./octocommerce
chmod +x ./install-dependencies.sh
./install-dependencies.sh
docker-compose up # --build
```

### Web UI Tools

- [Store Doc](http://localhost:3001/docs#)
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

### Web UI Tools

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
