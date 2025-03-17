export interface ICsv {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  customer_part_id?: string;
  manufacturer_name: string;
  manufacturer_part_id: string;
  competitor_name?: string;
  competitor_part_name?: string;
  competitor_part_id?: string;
  category: string;
  unit_of_measure?: string;
  unit_quantity?: string;
  requested_quantity?: string;
  requested_unit_price: string;
}
