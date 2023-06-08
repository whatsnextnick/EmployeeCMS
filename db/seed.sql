-- Insert departments
INSERT INTO department (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Human Resources'),
  ('Finance'),
  ('IT');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Manager', 50000, 1),
  ('Sales Representative', 30000, 1),
  ('Marketing Coordinator', 35000, 2),
  ('HR Specialist', 40000, 3),
  ('Accountant', 45000, 4),
  ('Software Developer', 55000, 5);

-- Insert employee names
INSERT INTO employee (first_name, last_name, role_id) VALUES
  ('Jean', 'Pierre', 1),
  ('Marie', 'Lambert', 1),
  ('Pierre', 'Michel', 2),
  ('Sophie', 'Joseph', 2),
  ('Marc', 'Jean-Baptiste', 3),
  ('Mireille', 'Dupont', 3),
  ('Jean-Claude', 'Paul', 4),
  ('Ginette', 'Fernandez', 4),
  ('Jacques', 'Lafontant', 5),
  ('Nathalie', 'Alexis', 5);

COMMIT;
