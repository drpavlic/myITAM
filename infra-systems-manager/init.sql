CREATE TABLE IF NOT EXISTS systems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    owner VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS computational_resources (
    id SERIAL PRIMARY KEY,
    system_id INTEGER REFERENCES systems(id),
    resource_type VARCHAR(255) NOT NULL,
    cpu_cores INTEGER,
    memory_gb NUMERIC(10,2),
    storage_gb NUMERIC(10,2),
    ip_address VARCHAR(45),
    hostname VARCHAR(255),
    os VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO systems (name, description, owner, status) VALUES
('CRM System', 'Customer Relationship Management system', 'IT Department', 'active'),
('ERP System', 'Enterprise Resource Planning system', 'Finance Department', 'active'),
('Web Portal', 'Customer facing web portal', 'Marketing Department', 'active')
ON CONFLICT (name) DO NOTHING;

INSERT INTO computational_resources (system_id, resource_type, cpu_cores, memory_gb, storage_gb, ip_address, hostname, os, status) VALUES
(1, 'Application Server', 8, 16, 100, '192.168.1.10', 'crm-app-01', 'Ubuntu 20.04', 'active'),
(1, 'Database Server', 16, 32, 500, '192.168.1.11', 'crm-db-01', 'CentOS 7', 'active'),
(2, 'Application Server', 12, 24, 200, '192.168.1.20', 'erp-app-01', 'Windows Server 2022', 'active'),
(3, 'Web Server', 4, 8, 50, '192.168.1.30', 'web-01', 'Ubuntu 22.04', 'active')
ON CONFLICT DO NOTHING;